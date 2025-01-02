import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: 100,
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {" "}
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>React Redux Ecommerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table
          tdStyle={{
            padding: "2px",
          }}
        >
          <TH
            style={{
              fontSize: 14,
            }}
          >
            <TD
              style={{
                justifyContent: "center",
              }}
            >
              Title
            </TD>
            <TD
              style={{
                justifyContent: "center",
              }}
            >
              Price
            </TD>
            <TD
              style={{
                justifyContent: "center",
              }}
            >
              Quantity
            </TD>
            <TD
              style={{
                justifyContent: "center",
              }}
            >
              Brand
            </TD>
            <TD
              style={{
                justifyContent: "center",
              }}
            >
              Color
            </TD>
          </TH>
          {order.products.map((p, index) => (
            <TR
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ddd" : undefined,
              }}
            >
              <TD
                style={{
                  justifyContent: "center",
                }}
              >
                {p.product.title}
              </TD>
              <TD
                style={{
                  justifyContent: "center",
                }}
              >
                Rs. {p.product.price}
              </TD>
              <TD
                style={{
                  justifyContent: "center",
                }}
              >
                {p.count}
              </TD>
              <TD
                style={{
                  justifyContent: "center",
                }}
              >
                {p.product.brand}
              </TD>
              <TD
                style={{
                  justifyContent: "center",
                }}
              >
                {p.color}
              </TD>
            </TR>
          ))}
        </Table>
        <Text style={styles.text}>
          Date :{" "}
          {new Date(order.paymentData.created_at * 1000).toLocaleString()}{" "}
          {" | "}
          Order Id : {order.paymentData.order_id}
          
        </Text>
        <Text style={styles.text}>
        Order Status : {order.orderStatus} {" | "}
        Total Paid : Rs. {order.paymentData.amount/100}
        </Text>
        <Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
      </Page>
    </Document>
  );
};

export default Invoice;
