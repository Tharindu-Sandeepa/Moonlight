import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const SupOrderPDFReport = ({ rows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Supply Orders Report</Text>
        <View>
          <Text>Supply Order ID | Supplier Name | Type | Weight | Supplier ID | Material ID | Gemstone ID | Description | Status</Text>
          {rows.map(row => (
            <Text key={row.supOrdId}>{`${row.supOrdId} | ${row.supName} | ${row.type} | ${row.quantity} | ${row.supID} | ${row.matID} | ${row.gemID} | ${row.description} | ${row.status}`}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default SupOrderPDFReport;
