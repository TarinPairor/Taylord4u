package initializers

import (
	"log"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db   *gorm.DB
	once sync.Once
)

func ConnectToDB() *gorm.DB {
	var err error
	// Update the values in the DSN to match your database configuration
	dsn := ""
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	// Print some property to ensure it's not null
	if db != nil {
		log.Println("Connected to the database successfully")
		log.Printf("Database name: %s", db.Name())
	} else {
		log.Fatal("Database connection is nil")
	}

	return db
}

func GetDB() *gorm.DB {
	once.Do(func() {
		db = ConnectToDB()
	})

	return db
}
