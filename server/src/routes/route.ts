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
const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const company_id = req.params.company_id;
  if (company_id === null) {
    res.status(400).json("Missing parameter");
    return;
  }

  database.useDb("TestDB");
  database
    .collection("companies")
    .deleteOne({ company_id: company_id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addCompany = async (req: Request, res: Response): Promise<void> => {
  const company_id = req.body.company_id;
  const company_name = req.body.company_name;
  const company_description = req.body.company_description;
  const company_contact_number = req.body.company_contact_number;
  const company_email = req.body.company_email;
  const company_logo = req.body.company_logo;
  const company_state = req.body.company_state;
  const company_city = req.body.company_city;
  const isvalid =
    company_id !== null &&
    company_name !== null &&
    company_description !== null &&
    company_contact_number !== null &&
    company_email !== null &&
    company_logo !== null &&
    company_state !== null &&
    company_city !== null;

  if (!isvalid) {
    res.status(400).json("Missing parameter");
    return;
  } else {
    database.useDb("TestDB");
    database
      .collection("companies")
      .find({ company_name: company_name })
      .toArray()
      .then((all) => {
        if (all.length === 0) {
          database
            .collection("companies")
            .find({ company_email: company_email })
            .toArray()
            .then((all) => {
              if (all.length === 0) {
                database
                  .collection("companies")
                  .insertOne({
                    company_id: company_id,
                    company_name: company_name,
                    company_description: company_description,
                    company_contact_number: company_contact_number,
                    company_email: company_email,
                    company_logo: company_logo,
                    company_state: company_state,
                    company_city: company_city,
                  })
                  .then((doc) => {
                    res.json(doc);
                  })
                  .catch((err) => {
                    res.status(500).json(err);
                  });
              } else {
                res.status(400).json("Email already exists");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          res.status(400).json("Company already exist with name");
        }
      });
  }
};
const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const company_id = req.body.company_id;
  const company_name = req.body.company_name;
  const company_description = req.body.company_description;
  const company_contact_number = req.body.company_contact_number;
  const company_email = req.body.company_email;
  const company_logo = req.body.company_logo;
  const company_state = req.body.company_state;
  const company_city = req.body.company_city;
  const isvalid =
    company_id !== null &&
    company_name !== null &&
    company_description !== null &&
    company_contact_number !== null &&
    company_email !== null &&
    company_logo !== null &&
    company_state !== null &&
    company_city !== null;
  console.log(
    company_id,
    company_name,
    company_description,
    company_contact_number,
    company_email,
    company_logo,
    company_state,
    company_city
  );
  if (!isvalid) {
    res.status(400).json("Missing parameter");
    return;
  } else {
    database.useDb("TestDB");
    database
      .collection("companies")
      .findOne({ company_name: company_name })
      .then((allCompanes) => {
        if (allCompanes === null) {
          database
            .collection("companies")
            .findOne({ company_email: company_email })

            .then((all: any) => {
              if (all.length === 0) {
                database
                  .collection("companies")
                  .updateOne(
                    { company_id: company_id },
                    {
                      $set: {
                        company_name: company_name,
                        company_description: company_description,
                        company_contact_number: company_contact_number,
                        company_email: company_email,
                        company_logo: company_logo,
                        company_state: company_state,
                        company_city: company_city,
                      },
                    }
                  )
                  .then((doc) => {
                    res.json(doc);
                  })
                  .catch((err) => {
                    res.status(500).json(err);
                  });
              } else {
                if (all.company_id === company_id) {
                  database
                    .collection("companies")
                    .updateOne(
                      { company_id: company_id },
                      {
                        $set: {
                          company_name: company_name,
                          company_description: company_description,
                          company_contact_number: company_contact_number,
                          company_email: company_email,
                          company_logo: company_logo,
                          company_state: company_state,
                          company_city: company_city,
                        },
                      }
                    )
                    .then((doc) => {
                      res.json(doc);
                    })
                    .catch((err) => {
                      res.status(500).json(err);
                    });
                } else {
                  res.status(400).json("Company already exist with email");
                }
              }
            });
        } else {
          if (allCompanes.company_id === company_id) {
            database
              .collection("companies")
              .updateOne(
                { company_id: company_id },
                {
                  $set: {
                    company_name: company_name,
                    company_description: company_description,
                    company_contact_number: company_contact_number,
                    company_email: company_email,
                    company_logo: company_logo,
                    company_state: company_state,
                    company_city: company_city,
                  },
                }
              )
              .then((doc) => {
                res.json(doc);
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          } else {
            res.status(400).json("Company id does not match");
          }
        }
      });
  }
};

export { getCompany, addCompany, deleteCompany, updateCompany };
