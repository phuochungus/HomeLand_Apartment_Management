
import { request } from "@/utils/request";
import { json } from "stream/consumers";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

export const residentService = {
  //get all resident
  getAllResident: async () => {
    const res = await request.get("person");
    console.log(res.data);
    return res.data;
  },

  //create resident
  createResident: async (data: FormData) => {
    try {
      console.log(data)
      const res = await request.post("resident", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Create successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      // toast.error("Create faily!", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  },
  // get resident by id
  getResidentById: async (id: string) => {
    try {
      const res = await request.get(`person/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  //update resident

  updateResident: async (
    data: {
      email: string;
      phone_number: string;
    },
    id: string
  ) => {
    const person = {
      email: data.email,
      phone_number: data.phone_number,
    };
    try {
      const res = await request.patch(
        `person/${id}/person`,
        JSON.stringify(person),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error("Update faily!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } 
  },
};
