import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function SCard() {
  
}

export async function getStaticProps(context) {
  // const products = JSON.parse(response);
  // console.log(products)
  return {
    props: { response }, // will be passed to the page component as props
  };
}
