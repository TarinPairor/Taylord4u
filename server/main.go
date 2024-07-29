package main

import (
	//"fmt"

	"github.com/TarinPairor/CVWO-assignment-2024/controllers"
	initializers "github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	/*
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	now in init folder
	*/

	initializers.LoadEnvVariables()
	//initializers.ConnectToDB()
}

// PORT = 3000 declared in .env
func main() {
	
	r := gin.Default()

	// Use cors middleware
	//config := cors.DefaultConfig()
	//config.AllowOrigins = []string{"http://localhost:5173"}  
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://taylord4u-render-forum.onrender.com", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))
	
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173") 
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Next()
	})
	

	//SimpleUsers
	// r.POST("/simplesignup", controllers.SimpleSignup)
	// r.POST("/simplelogin", controllers.SimpleLogin)
	// r.GET("/simplevalidate", middleware.RequireAuth, controllers.SimpleValidate)
	// r.POST("/simplelogout", middleware.RequireSimpleAuth, controllers.SimpleLogout)
	// r.GET("/simplegetallusers", controllers.GetAllSimpleUsers)



	r.GET("/health", controllers.HealthCheckHandler)

	//Users
	r.POST("/signup", controllers.Signup)
	r.GET("/getallusers", controllers.GetAllUsers)
	r.POST("/login", controllers.Login)
	r.GET("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.POST("/logout", middleware.RequireAuth, controllers.Logout)
	

	//Posts
	r.POST("/posts", controllers.PostsCreate)
	r.PUT("/posts/:id", controllers.PostsUpdate)
	r.GET("/posts", controllers.PostsIndex)
	r.GET("/posts/:id", controllers.PostsShow)
	r.DELETE("/posts/:id", controllers.PostsDelete)
	r.GET("/posts/tags/:tag", controllers.PostsUnderTag)
	r.GET("/tags", controllers.AllTags)

	//Comments
	r.POST("/comments/:postid", controllers.CommentsCreate)
	r.PUT("/comments/:id", controllers.CommentsUpdate)
	r.GET("/comments", controllers.CommentsIndex)
	r.GET("/comments/:id", controllers.CommentsShow)
	r.DELETE("/comments/:id", controllers.CommentsDelete)
	r.GET("/comments/post", controllers.CommentsUnderPost) // "/comments/post?postid=:postid"



	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
  }


  