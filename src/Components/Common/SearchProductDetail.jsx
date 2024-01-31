import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL, docPrefixURL, imgPrefixURL } from "./ddata";
import ReactPlayer from "react-player";
import ProductService from "../services/ProductService";
import FileService from "../services/FileService";
import ProductSizeService from "../services/ProductSizeService";

export const SearchProductDetail = () => {
  const params = useParams();
  // console.log(params.id);
  const [product, setProduct] = useState([]);

  const [images, setImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [activeImg, setActiveImage] = useState();
  const [fileRealDisplay, setFileRealDisplay] = useState([]);
  useEffect(() => {
    fetch(URL + "/product/id/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        // console.log(data.name);
      });
  }, []);

  useEffect(() => {
    ProductService.findById(params.id).then((result) => {
      setProduct(result);
    });

    FileService.findImagesByContainerId(params.id).then((result) => {
      const thumbs = result.filter((i) => i.containerClass == "Thumbnail");
      const docs = result.filter((r) => r.containerClass == "Document");
      setFileRealDisplay(docs);
      if (thumbs && thumbs.length > 0) {
        setImages(thumbs);
        const originalFilename = getImageFilename(thumbs[0].filename);
        setActiveImage(imgPrefixURL + "/" + originalFilename);
      }
    });

    ProductSizeService.findAllByProductId(params.id).then((result) => {
      setProductSizes(result);
    });
  }, []);

  function getImageFilename(filename) {
    if (filename) {
      return filename.replace("thumbnail-", "");
    }
    return filename;
  }

  function activateThumbnail(thumbnailFilename) {
    setActiveImage(imgPrefixURL + "/" + getImageFilename(thumbnailFilename));
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12  mt-3 mb-3">
          <h5 className="product-name">{product.name}</h5>
        </div>

        <div className="row">
          <div className="col-md-6 image-container">
            <img src={activeImg} alt="" className="product-image" />
            <div className="thumbnail-container">
              {images.map((image) => (
                <img
                  src={imgPrefixURL + "/" + image.filename}
                  alt=""
                  className="thumbnail"
                  onClick={() => activateThumbnail(image.filename)}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <p className="product-description">{product.description}</p>

            <table>
              <thead>
                <tr>
                  <th>Артикул</th>
                  <th>Размер</th>
                </tr>
              </thead>
              <tbody>
                {productSizes.map((productSize) => (
                  <tr>
                    <td>{productSize.article}</td>
                    <td>{productSize.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="video-container">
              <ReactPlayer
                className="video-player"
                url={product.video}
                controls
              />
            </div>

            <div id="fileDisplayArea">{product.file_pr}</div>
          </div>
        </div>

        <div className="container ">
          <div className="row ">
            {fileRealDisplay.map((product) => (
              <div className="col-md-4 mb-3 " key={product.id}>
                <div className="img-thumbnail position-relative ">
                  <div className="d-flex align-items-center ">
                    <a
                      href={docPrefixURL + product.filename}
                      target="_blank"
                      className="d-flex"
                    >
                      <i className="fa fa-file-pdf-o pdfFile"></i>
                      <span className="file_name">{product.description}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
