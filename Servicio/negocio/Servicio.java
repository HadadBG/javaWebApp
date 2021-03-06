/*
  Servicio.java
  Servicio web tipo REST
  Carlos Pineda Guerrero, Octubre 2021
*/

package negocio;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Response;

import java.sql.*;
import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;

import java.util.ArrayList;
import com.google.gson.*;

// la URL del servicio web es http://localhost:8080/Servicio/rest/ws
// donde:
//	"Servicio" es el dominio del servicio web (es decir, el nombre de archivo Servicio.war)
//	"rest" se define en la etiqueta <url-pattern> de <servlet-mapping> en el archivo WEB-INF\web.xml
//	"ws" se define en la siguiente anotacin @Path de la clase Servicio

@Path("ws")
public class Servicio
{
  static DataSource pool = null;
  static
  {		
    try
    {
      Context ctx = new InitialContext();
      pool = (DataSource)ctx.lookup("java:comp/env/jdbc/datasource_Servicio");
    }
    catch(Exception e)
    {
      e.printStackTrace();
    }
  }

  static Gson j = new GsonBuilder()
		.registerTypeAdapter(byte[].class,new AdaptadorGsonBase64())
		.setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
		.create();

  @POST
  @Path("alta_articulo")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.APPLICATION_JSON)
  public Response alta(@FormParam("articulo") Articulo articulo) throws Exception
  {
    Connection conexion = pool.getConnection();

    if (articulo.descripcion == null || articulo.descripcion.equals(""))
      return Response.status(400).entity(j.toJson(new Error("Se debe ingresar una descripcion"))).build();

    if (articulo.precio == null || articulo.precio.equals(""))
      return Response.status(400).entity(j.toJson(new Error("Se debe ingresar un precio"))).build();

    if (articulo.stock == null || articulo.stock.equals(""))
      return Response.status(400).entity(j.toJson(new Error("Se debe ingresar el stock del articulo"))).build();
    int id=0;
    try
    {
      
      conexion.setAutoCommit(false);

      PreparedStatement stmt_1 = conexion.prepareStatement("INSERT INTO almacen(id_articulo,descripcion,precio,stock) VALUES (0,?,?,?)");
      try
      {
        stmt_1.setString(1,articulo.descripcion);
        stmt_1.setFloat(2,articulo.precio);
        stmt_1.setInt(3,articulo.stock);
        stmt_1.executeUpdate();
      }
      finally
      {
        stmt_1.close();
      }

       PreparedStatement stmt_2 = conexion.prepareStatement("SELECT LAST_INSERT_ID()");
      try
      {

       ResultSet rs = stmt_2.executeQuery();
        try
        {
          if (rs.next())
          {
	    id=rs.getInt(1);
          }
        }
        finally
        {
          rs.close();
        }
      }
      catch (Exception e){
      	return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
      }
      finally
      {
        stmt_2.close();
      }

      if (articulo.foto != null)
      {
        PreparedStatement stmt_3 = conexion.prepareStatement("INSERT INTO fotos_articulos VALUES (0,?,?)");
        try
        {
          stmt_3.setInt(1,id);
          stmt_3.setBytes(2,articulo.foto);
          stmt_3.executeUpdate();
        }
        finally
        {
          stmt_3.close();
        }
      }
      conexion.commit();
    }
    catch (Exception e)
    {
      conexion.rollback();
      return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
    }
    finally
    {
      conexion.setAutoCommit(true);
      conexion.close();
    }
    return Response.ok().build();
  }

  @POST
  @Path("get_articulos")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.APPLICATION_JSON)
  public Response get_articulos(@FormParam("descripcion") String descripcion) throws Exception
  {
    Connection conexion= pool.getConnection();

    try
    {
      PreparedStatement stmt_1 = conexion.prepareStatement("SELECT a.id_articulo ,a.descripcion,a.precio,a.stock,b.foto FROM almacen a LEFT OUTER JOIN fotos_articulos b ON a.id_articulo=b.id_articulo where a.descripcion like ?");
      try
      {
        stmt_1.setString(1,"%"+descripcion+"%");

        ResultSet rs = stmt_1.executeQuery();

        ArrayList<Articulo> articulos = new ArrayList<Articulo>(); // Create an ArrayList object

        try
        {
          while (rs.next())
          {
            Articulo r = new Articulo();
            r.id = rs.getInt(1);
            r.descripcion = rs.getString(2);
            r.precio = rs.getFloat(3);
            r.stock = rs.getInt(4);       
	    r.foto = rs.getBytes(5);
            articulos.add(r);
          }
          return Response.ok().entity(j.toJson(articulos)).build();
        }
        finally
        {
          rs.close();
        }
      }
      finally
      {
        stmt_1.close();
      }
    }
    catch (Exception e)
    {
      return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
    }
    finally
    {
      conexion.close();
    }
  }

  @POST
  @Path("get_carrito")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.APPLICATION_JSON)
  public Response get_carrito() throws Exception
  {
    Connection conexion= pool.getConnection();

    try
    {
      PreparedStatement stmt_1 = conexion.prepareStatement("SELECT a.id_articulo, a.descripcion,a.precio,c.cantidad,b.foto from  carrito c,almacen a  LEFT OUTER JOIN fotos_articulos b ON a.id_articulo=b.id_articulo where a.id_articulo=c.id_articulo");
      int cantidad;
      try
      {
        ResultSet rs = stmt_1.executeQuery();

        ArrayList<Articulo> articulos = new ArrayList<Articulo>(); // Create an ArrayList object

        try
        {
          while (rs.next())
          {
            Articulo r = new Articulo();
            r.id = rs.getInt(1);
            r.descripcion = rs.getString(2);
            r.precio = rs.getFloat(3);
            r.stock = rs.getInt(4); //Este campo en realidad es la cantidad de articulos en el carrito pero para ahorrar memoria utilizaemos este campo      
	          r.foto = rs.getBytes(5);
            articulos.add(r);
          }
          return Response.ok().entity(j.toJson(articulos)).build();
        }
        finally
        {
          rs.close();
        }
      }
      finally
      {
        stmt_1.close();
      }

    }
    catch (Exception e)
    {
      return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
    }
    finally
    {
      conexion.close();
    }
  }

  @POST
  @Path("elimina_carrito")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.APPLICATION_JSON)
  public Response borra(@FormParam("id_articulo") int id,@FormParam("cantidad") int cantidad) throws Exception
  {
    Connection conexion= pool.getConnection();
    try
    {
      conexion.setAutoCommit(false);
      PreparedStatement stmt_1 = conexion.prepareStatement("UPDATE almacen SET stock = stock + ? WHERE id_articulo = ?");
      try
      {
        stmt_1.setInt(1,cantidad);
        stmt_1.setInt(2,id);
        stmt_1.execute();
      }
      finally
      {
        stmt_1.close();
      }
      PreparedStatement stmt_2 = conexion.prepareStatement("DELETE FROM carrito WHERE id_articulo=?");
      try
      {
        stmt_2.setInt(1,id);
      	stmt_2.executeUpdate();
      }
      finally
      {
        stmt_2.close();
      } 
      conexion.commit();
    }
    catch (Exception e)
    {
      conexion.rollback();
      return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
    }
    finally
    {
      conexion.setAutoCommit(true);
      conexion.close();
    }
    return Response.ok().build();
  }

  @POST
  @Path("anade_carrito")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.APPLICATION_JSON)
  public Response alta(@FormParam("id_articulo") int id,@FormParam("cantidad") int cantidad) throws Exception
  {
    Connection conexion = pool.getConnection();
    try
    {
      PreparedStatement stmt_1 = conexion.prepareStatement("SELECT stock FROM almacen where id_articulo=?");
      try
      {
        stmt_1.setInt(1,id);
        ResultSet rs =stmt_1.executeQuery();
        if(rs.next()){
          int stock = rs.getInt(1);
          if ( stock >= cantidad){
            try{
               conexion.setAutoCommit(false);
               PreparedStatement stmt_2 = conexion.prepareStatement("Update almacen SET stock=stock-? where id_articulo=?");
               try{
		stmt_2.setInt(1,cantidad);
		stmt_2.setInt(2,id);
                stmt_2.executeUpdate();
               }
                finally
                {
                  stmt_2.close();
                }
                PreparedStatement stmt_3 = conexion.prepareStatement("INSERT INTO carrito(id_articulo,cantidad) VALUES (?,?) ");
                try{
                  stmt_3.setInt(1,id);
                  stmt_3.setInt(2,cantidad);
                  stmt_3.executeUpdate();
                }
                finally
                {
                  stmt_3.close();
                }
                conexion.commit();
            }
            catch(Exception e){
              conexion.rollback();
              return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
            }   
            finally{
              conexion.setAutoCommit(true);
            }
          }  
          else{
            Articulo m = new Articulo();
            m.descripcion="No hay los suficientes productos en el almacen";
            m.stock=stock;
            return Response.status(400).entity(j.toJson(m)).build();
          }
        }
      }
      finally
      {
        stmt_1.close();
      }
    }
    catch (Exception e)
    {
      return Response.status(400).entity(j.toJson(new Error(e.getMessage()))).build();
    }
    finally
    {
      conexion.close();
    }
    return Response.ok().build();
  }
}
