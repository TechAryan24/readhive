import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import {useSupabase} from "../context/Supabase";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../style/Details.scss"

const BookDetailPage = () => {
  const params = useParams();
  console.log("Params: ", params);
  const supabase = useSupabase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  console.log(data);
  const [url, setURL] = useState(null);
  const [burl, setBURL] = useState(null);

  useEffect(() => {
    supabase.getBookById(params.bookId).then((value) => setData(value));
  }, []);

  useEffect(() => {
    if (data) {
      setURL(data.imgURL);
      console.log("imageurl: ", data.imgURL);
    }
  }, [data]);



  useEffect(() => {
    if (data) {
      setBURL(data.pdfURL);
      console.log("pdfurl: ", data.pdfURL);
    }
  }, [data]);

  if (data == null) return <h1>Loading....</h1>;
  return (
    <Container>
    <Row>
    <div className="main">
      <Col>
        <div className="mt-5">
          <img src={url} width="90%" style={{ borderRadius: "20px" }} alt="" className="mainImg"/>
        </div>
      </Col>
      <Col xs={8}>
        <div className="mt-5">
          <h5 className="m-3">Name: {data.name}</h5>
          <h5><p className="m-3">Release Date: {data.rdate}</p>
          <p className="m-3">Author: {data.author}</p>
          <p className="m-3">Tropes: {data.trope}</p>
          <p className="m-3 mainDesc">Description: <br></br> <h6 className="m-2"> {data.desc}</h6></p>
          </h5>
          <br></br>
          <h5 className="m-3">Owner Details:</h5>
          <h5><p className="m-3">Email: {data.userEmail}</p></h5>
          <br></br>
          <Button  variant="success" style={{marginBottom:"10px"}}>
            <a href={burl} rel="noreferrer" target="_blank" style={{textDecoration:"none", color:"white", marginBottom:"10px"}}>
            Download PDF
            </a>
          </Button>
        </div>
      </Col>
    </div>
    </Row>
    
  </Container>
  );
};

export default BookDetailPage;
