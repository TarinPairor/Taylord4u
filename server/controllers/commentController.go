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

func CommentsCreate(c *gin.Context) {
	// Get postid from the URL
	postID := c.Param("postid")

	// Get data from the request body
	var body struct {
		Body  string
		Email string
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

	// Query post to get the ID based on the provided postid
	var post models.Post
	if err := db.First(&post, postID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found"})
		return
	}

	// Create a new comment associated with the obtained post ID
	comment := models.Comment{Body: body.Body, Email: body.Email, PostID: post.ID}
	result := db.Create(&comment)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"comment": comment})
}


func CommentsIndex(c *gin.Context) {


	var comments []models.Comment
	result := db.Find(&comments)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"comments": comments,
	})

  }

  func CommentsShow(c *gin.Context) {

	id := c.Param("id")

	var comment models.Comment
	result := db.First(&comment, id)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"comment": comment,
	})

  }

  func CommentsUpdate(c *gin.Context) {
	// Get id from the URL
	id := c.Param("id")

	//postID := c.Param("postid")

	// Get data from the request body
	var body struct {
		Email string
		Body  string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// Find the comment being updated
	var comment models.Comment
	if err := db.First(&comment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Comment not found",
		})
		return
	}

	// Check if the email in the request body matches the comment's email
	if body.Email != comment.Email {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized to update this comment",
		})
		return
	}

	// Update the comment
	db.Model(&comment).Updates(models.Comment{
		Body: body.Body,
	})

	// Respond with the updated comment and post
	c.JSON(http.StatusOK, gin.H{
		"comment": comment,
	})
}

func CommentsDelete(c *gin.Context) {
	// Get id from the URL
	id := c.Param("id")

	// Find the comment being deleted
	var comment models.Comment
	if err := db.First(&comment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Comment not found",
		})
		return
	}

	// Delete the comment
	if err := db.Delete(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete comment",
		})
		return
	}

	// Respond
	c.Status(http.StatusOK)
}

func CommentsUnderPost(c *gin.Context) {
	// Get postid from the query parameters
	postID := c.Query("postid")

	// Find all comments with the specified postID
	var comments []models.Comment
	if err := db.Where("post_id = ?", postID).Find(&comments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve comments"})
		return
	}

	// Respond with the comments under the post
	c.JSON(http.StatusOK, gin.H{"comments": comments})
}
