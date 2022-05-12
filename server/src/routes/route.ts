import { Request, Response } from "express";
import mongoose from "mongoose";
import db from "../../server";
import { v4 as uuid } from "uuid";
const database = mongoose.connection;

const getCompany = async (req: Request, res: Response): Promise<void> => {
  database.useDb("TestDB");
  database
    .collection("companies")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addCompany = async (req: Request, res: Response): Promise<void> => {
  const name = req.body.name;
  database.useDb("TestDB");
  database
    .collection("companies")
    .find({ company_name: name })
    .toArray()
    .then((all) => {
      if (all.length === 0) {
        database
          .collection("companies")
          .insertOne({
            company_id: uuid(),
            company_name: "Uno Tech Solution",
            company_description:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet odit voluptatem maiores neque quis perspiciatis. Architecto excepturi quasi reprehenderit, quo exercitationem magni vitae. Nam totam voluptatem cumque inventore amet enim, vitae itaque magni molestias iusto ipsam officiis! Libero quae nisi a tempora ut omnis non velit nulla beatae fugiat quibusdam nam esse autem ex reiciendis mollitia minus, dignissimos accusantium. Error.",
            company_contact_number: 4875494514,
            company_email: "Unotech@sul.com",
            company_logo:
              "https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_960_720.png",
            company_state: "Maharastra",
            company_city: "Thane",
          })
          .then((doc) => {
            res.json(doc);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(400).json("Company already exsit with name");
      }
    });
};

export { getCompany, addCompany };
