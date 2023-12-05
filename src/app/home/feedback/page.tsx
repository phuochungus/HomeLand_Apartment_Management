"use client";
import { Service } from "@/models/service";
import styles from "./page.module.css";
import {
        Button,
        Carousel,
        Col,
        Container,
        Form,
        Image,
        Row,
        Spinner,
} from "react-bootstrap";

import { futuna } from "../../../../public/fonts/futura";
import { ChangeEvent, useEffect, useState } from "react";
import { endpoint } from "@/constraints/endpoints";
import { useQuery } from "react-query";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import toastMessage from "../../../utils/toast";
import StarRatings from "react-star-ratings";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Feedback } from "@/models/feedback";
import { Value } from "sass";
const Feedback = () => {
        type FormValue = {
                rating: string;
                comment: string;
        };
        const [formValue, setFormValue] = useState({
                rating: "",
                comment: "",
        });
        const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
        useEffect(() => {
                const fetchFeedback = async () => {
                        try {
                                const response = await axios.get('/api/feedback');
                                setFeedbackData(response.data);
                        } catch (err) {
                                console.error(err);
                        }
                };

                fetchFeedback();
        }, []);
        const [errors, setErrors] = useState<any>();
        const validation = () => {
                let err = {} as FormValue;

                if (formValue.rating === "") {
                        err.rating = "Trường rating là bắt buộc!";
                }
                if (formValue.comment === "") {
                        err.comment = "Trường cmt là bắt buộc!";
                }

                return err;
        };
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                const newObj = { ...formValue, [e.target.name]: e.target.value };
                setFormValue(newObj);
        };

        const [feedbackId, setFeedbackId] = useState(null);
        const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('createHandle called');
                console.log('formValue:', formValue);
                const err = validation();
                setErrors(err);
                if (Object.keys(err).length === 0) {
                        const form = new FormData();
                        form.append("rating", formValue.rating);
                        form.append("comment", formValue.comment);

                        try {
                                loadingFiler(document.body!);
                                await axios.post(`/api/feedback`, form);
                                setFormValue({ rating: "", comment: "" });
                                removeLoadingFilter(document.body!);
                                toastMessage({ type: "success", title: "Create successfully!" });
                        } catch (e) {
                                console.log(e);
                                removeLoadingFilter(document.body!);
                                toastMessage({ type: "error", title: "Create faily!" });
                        }
                }
        };
        const [rating, setRating] = useState(0);
        const [comment, setComment] = useState('');
        const handleRatingChange = (newRating: number) => {
                setRating(newRating);
                setFormValue(prevState => ({ ...prevState, rating: newRating.toString() }));
        };
        return (
                <main className={styles.main} style={futuna.style}>
                        <div>
                                <Container className="p-lg-5">
                                        <Row style={{ marginTop: "20px" }}>
                                                <Col>
                                                        <h3>
                                                                <b>Feedback</b>
                                                        </h3>
                                                </Col>
                                        </Row>
                                        <Row style={{
                                                backgroundColor: "rgba(40, 100, 255, 0.1)",
                                                border: "1px black solid",
                                                borderRadius: "20px",
                                                margin: "20px 0px",
                                                paddingTop: "20px ",
                                        }}
                                        >
                                                <StarRatings
                                                        rating={rating}
                                                        starRatedColor="gold"
                                                        changeRating={handleRatingChange}
                                                        numberOfStars={5}
                                                        starDimension="30px"
                                                        starSpacing="5px"
                                                />
                                                {/* <textarea
                      className="form-control"
                      style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px", marginRight: "10px", width: "90%" }}
                      placeholder="Comment"
                      rows={5}
                      name="comment"
                      onChange={handleChange}
                      value={formValue.comment} // use the comment state
      
                    ></textarea> */}
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={styles.label}>Comment</Form.Label>
                                                        <Form.Control
                                                                size="lg"
                                                                type="text"
                                                                name="comment"
                                                                onChange={handleChange}
                                                                value={formValue.comment}
                                                                placeholder=""
                                                        />
                                                        {errors && errors.comment && (
                                                                <span className={styles.error}>{errors.comment}</span>
                                                        )}
                                                </Form.Group>
                                                <ButtonComponent onClick={createHandle} className={styles.creatBtn1}>
                                                        Tạo
                                                </ButtonComponent>


                                        </Row>
                                </Container>
                                {feedbackData.map((feedback, index) => (
                                        <div key={index}>
                                                <p>Rating: {feedback.rating}</p>
                                                <p>Comment: {feedback.comment}</p>
                                        </div>
                                ))}
                        </div>
                        <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                        />
                </main>
        );

}
export default Feedback;
