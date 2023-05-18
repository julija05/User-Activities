import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReportTable from './ReportTable';

// Create Document Component
export const MyDocument = () => (
    <Document>
      <Page size="A4" >
       <ReportTable/>
      </Page>
    </Document>
  );