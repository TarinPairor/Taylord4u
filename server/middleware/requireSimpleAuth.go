package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	db = initializers.ConnectToDB()
}

func RequireSimpleAuth(c *gin.Context) {
	// Get cookie
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Decode/Validate
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte("abc"), nil
	})

	if err != nil || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Check expiration
	expiration, ok := claims["exp"].(float64)
	if !ok || float64(time.Now().Unix()) > expiration {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Find user with token sub
	var user models.SimpleUser
	db.First(&user, claims["sub"])

	if user.ID == 0 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Attach with req
	c.Set("user", user)

	// Continue to next
	c.Next()

	fmt.Println(claims["foo"], claims["nbf"])
}
