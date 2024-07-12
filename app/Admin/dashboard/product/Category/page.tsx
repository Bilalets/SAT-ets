'use client'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Cat = () => {
    const [categoryName,setcategoryName]=useState<string>()
    const [isModalVisible1,setIsModalVisible1]=useState(false)
    const handleOpenModal1 = () => {
        setIsModalVisible1(true);
      };
      const handleCloseModal1 = () => {
        setIsModalVisible1(false);
      };
    
    const addcate = async (SerID: string) => {
   

        if (categoryName&& categoryName.trim() !== "") {
          try {
            await axios.post("/api/Service/Category", {
              name: categoryName,
              serviceId: SerID,
            });
    
            toast.success("Category added successfully!");
            handleCloseModal1()
            setcategoryName('')
           // await fetchData();
          } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Error adding category");
          }
        } else {
          toast.error("Category name cannot be empty");
        }
      };
      const deletecat = async (SerID: string) => {
        const confirmation = window.confirm(
          "Are you sure you want to delete this category? This action cannot be undone."
        );
    
        if (confirmation) {
          try {
            await axios.delete("/api/Service/delcategory", {
              data: { id: SerID },
            });
    
            toast.success("Category deleted successfully!");
    
          //  await fetchData();
          } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Error deleting category");
          }
        }
      };
      const updatecate = async (SerID: string) => {
        let updatedcategoryname = prompt("Enter New Category Name");
        if (updatedcategoryname) {
          try {
            await axios.put("/api/Service/updatecategory", {
              name: updatedcategoryname,
              id: SerID,
            });
    
            toast.success("Category Name Updated Sucessfully");
          //  await fetchData();
          } catch (error) {
            toast.error("Error Updating Category Name");
          }
        }
      };    
  return (
    <div>Cat</div>
  )
}

export default Cat;