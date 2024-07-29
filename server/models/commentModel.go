package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Email  string
	Body   string
	PostID    uint
}
