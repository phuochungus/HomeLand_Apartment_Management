import { Person } from "@/app/residents/page";
import { request } from "@/utils/request";
import { json } from "stream/consumers";
import axios from "axios";
export const residentService = {
  //get all resident
  getAllResident: async () => {
    const res = await request.get("person");
    return res.data;
  },

  //create resident
  createResident: async (data: {
    role: string;
    gender: string;
    name: string;
    dayOfBirth: Date;
    phone: string;
    email: string;
    cccd: string;
    frontImg: string;
    backImg: string;
  }) => {
    const person = {
      role: data.role,
      gender: data.gender,
      date_of_birth: data.dayOfBirth,
      name: data.name,
      phone_number: data.phone,
      email: data.email,
      front_identify_card_photo_URL: data.frontImg,
      back_identify_card_photo_URL: data.backImg,
    };
    try {
      const res = await request.post("person", person);
    } catch (e) {
      console.log('error')
    }
  },
  // get resident by id
  getResidentById: async (id: string) => {
    try {
    
      const res = await request.get(`person/${id}`)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  //update resident

  updateResident: async (data: {
    role: string;
    gender: string;
    name: string;
    dayOfBirth: Date;
    phone: string;
    email: string;
    cccd: string;
    frontImg: string;
    backImg: string;
  }, id:string) => {
    const person = {
      role: data.role,
      gender: data.gender,
      date_of_birth: data.dayOfBirth,
      name: data.name,
      phone_number: data.phone,
      email: data.email,
      front_identify_card_photo_URL: data.frontImg,
      back_identify_card_photo_URL: data.backImg,
    };
    try {
      const res = await request.patch(`person/${id}/account`, person);
    } catch (e) {
      console.log('error')
    }
  },
};
