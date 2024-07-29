package main

import (
	"fmt"

	initializers "github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	initializers.LoadEnvVariables()
	db = initializers.ConnectToDB() // assignment, not :=
}

func main() {
	// Ensure DB is not nil before using it
	if db == nil {
		fmt.Println("DB is nil. Connection to the database failed.")
		return
	}
	// Use the Create method of the Gorm DB instance to insert the new record/table
	db.AutoMigrate(&models.Post{})
	//db.AutoMigrate(&models.User{})
	//db.AutoMigrate(&models.Comment{})
	//db.AutoMigrate(&models.SimpleUser{})


}
