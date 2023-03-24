import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  View,
} from "@react-pdf/renderer";



const TripPDF = ()=> {
  return (
    <div>
      <Document>
        <Page size="A4" >
          <View >
            <Text >Trip Details</Text>
            {/* Add more PDF content using react-pdf components */}
          </View>
        </Page>
      </Document>
    </div>
  );
}

export default TripPDF;
