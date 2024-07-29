package controllers

import (
	"net/http"

	"github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)



func init() {
	db = initializers.GetDB()
}

func SimpleSignup(c *gin.Context) {
	var body struct {
		Name string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	user := models.SimpleUser{
		Name: body.Name,
	}
	result := db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func SimpleLogin(c *gin.Context) {
	var body struct {
		Name string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	var user models.SimpleUser
	db.First(&user, "name = ?", body.Name)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid name"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
	})

	tokenString, err := token.SignedString([]byte("abc"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create token"})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func SimpleValidate(c *gin.Context) {
	user, exists := c.Get("user")
	
	if exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": exists})
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func SimpleLogout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func GetAllSimpleUsers(c *gin.Context) {
	var simpleUsers []models.SimpleUser

	// Fetch all simpleUsers from the database
	result := db.Find(&simpleUsers)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch simpleUsers",
		})
		return
	}

	// Respond with the list of simpleUsers in JSON format
	c.JSON(http.StatusOK, gin.H{
		"users": simpleUsers,
	})
}
