package controllers

import (
	//"net/http"

	"net/http"

	"github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"github.com/gin-gonic/gin"
)

func init() {
	db = initializers.GetDB()
}

func PostsCreate(c *gin.Context) {
	var body struct {
		Body  string
		Title string
		Email string
		Tag string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Query user to get the ID based on the provided email
	var user models.User
	if err := db.Where("email = ?", body.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// Create a new post associated with the obtained user ID
	post := models.Post{Title: body.Title, Body: body.Body, Email: user.Email, Tag: body.Tag}
	result := db.Create(&post)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"post": post})
}

/*
func PostsCreate(c *gin.Context) {

	var body struct {
		Body string
		Title string
	}

	c.Bind(&body)

	// Initalize db
	// Can post json files in /post 
	post := models.Post{Title: body.Title, Body: body.Body}

	result := db.Create(&post) // pass pointer of data to Create

	if result.Error != nil {
		c.Status(400)
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
	  "posts": post,
	})
	
  }

  

  */

  func PostsIndex(c *gin.Context) {


	var posts []models.Post
	result := db.Find(&posts)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"posts": posts,
	})

  }

  

  func PostsShow(c *gin.Context) {

	// retrieve id from context.Param of type id
	id := c.Param("id")

	var post models.Post
	result := db.First(&post, id)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})

  }

  func PostsUpdate(c *gin.Context) {
	// Get id from the URL
	id := c.Param("id")

	// Get data from the request body
	var body struct {
		Email string // Add Email to the request body
		Body  string
		Title string
		Tag string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// Find the post being updated
	var post models.Post
	if err := db.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post not found",
		})
		return
	}

	// Check if the email in the request body matches the post's email
	if body.Email != post.Email {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized to update this post",
		})
		return
	}

	// Update the post
	db.Model(&post).Updates(models.Post{
		Title: body.Title,
		Body:  body.Body,
		Tag: body.Tag,
	})

	// Respond with the updated post
	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})
}


  /*
  func PostsUpdate(c * gin.Context) {

	//Get id off url
	id := c.Param("id")

	//Get data of req body
	var body struct {
		Body string
		Title string
	}

	c.Bind(&body)

	//Find the post we r updating
	var post models.Post
	db.First(&post, id)

	//Update it
	db.Model(&post).Updates(models.Post{
		Title: body.Title,
		Body: body.Body,
	})

	//Respond with it
	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})
  }

  */

  func PostsDelete(c *gin.Context) {

	//Get id off url
	id := c.Param("id")

	//Delete post
	db.Delete(&models.Post{}, id)

	//Respond
	c.Status(200)

  }

  func PostsUnderTag(c *gin.Context) {
    // retrieve tag from context.Param of type tag
    tag := c.Param("tag")

    var posts []models.Post
	
    result := db.Where("tag = ?", tag).Find(&posts)

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to fetch posts"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"posts": posts})
}

func AllTags(c *gin.Context) {
    var tags []*string
	result := db.Model(&models.Post{}).Distinct().Where("tag IS NOT NULL").Pluck("tag", &tags)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can not get tags"})
		return
	}

    c.JSON(http.StatusOK, gin.H{"tags": tags})
}
