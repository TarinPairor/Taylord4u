package models

import "gorm.io/gorm"

type SimpleUser struct {
	gorm.Model
	Name string `gorm:"unique"`
}