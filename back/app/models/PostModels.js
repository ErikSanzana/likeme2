import { pool } from "../../db.js";


export const createGetModel = async () => {
    try {
      const SQLquery = {
        text: "SELECT * FROM posts;",
      };
      const response = await pool.query(SQLquery);
      return response.rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving posts: " + error.message);
    }
  };


export const getIDModel = async (id) => {
  try {
    const SQLquery = {
      text: "SELECT * FROM posts WHERE id = $1;",
      values: [id],
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("Not Found post from ID");
    }
    return response.rows;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


export const createPostModel = async (titulo, url, descripcion) => {
  try {
    const SQLquery = {
      text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *; ",
      values: [titulo, url, descripcion, 0],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating: " + error.message);
  }
};

export const createLikeModel = async (id) => {
    try {
      const SQLquery = {
        text: "UPDATE posts SET likes = likes + 1 WHERE id= $1 RETURNING likes;",
        values: [id],
      };
      const response = await pool.query(SQLquery);
      if (response.rowCount === 0) {
        throw new Error("Post not found for ID: " + id);
      }
      return response.rows[0].likes; 
    } catch (error) {
      console.error(error);
      throw new Error("Error updating likes: " + error.message);
    }
  };

export const createPutUpdate = async (id, titulo, url, descripcion, likes) => {
  try {
    const SQLquery = {
      text: "UPDATE posts SET titulo = $2, img = $3, descripcion = $4, likes =$5 WHERE id=$1;",
      values: [id, titulo, url, descripcion, likes],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
    throw new Error(error.message); 
  }
};

export const createDeleteModel = async (id) => {
  try {
    const SQLquery = {
      text: "DELETE FROM posts WHERE id= $1;",
      values: [id],
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("This item has already been deleted or not exist...");
    }
    return response.rows;
  } catch (error) {
    console.log(error);
    throw new Error(error.message); 
  }
};
