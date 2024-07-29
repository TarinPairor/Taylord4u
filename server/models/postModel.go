package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Email  string
	Title  string
	Body   string
	Tag string
}
