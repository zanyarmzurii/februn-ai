'use client'

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import QRCode from 'react-qr-code'

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#020617', color: '#fbbf24', fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  body: { fontSize: 14, marginBottom: 10, color: '#cbd5e1' },
  qr: { marginTop: 30, textAlign: 'center' }
})

export function Certificate({ userName, courseName, date, verificationCode }: {
  userName: string; courseName: string; date: string; verificationCode: string;
}) {
  const qrValue = `https://februn.ai/verify?code=${verificationCode}`

  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.body}>This certifies that {userName} has successfully completed the course "{courseName}" on {date}.</Text>
        <View style={styles.qr}>
          <QRCode value={qrValue} />
        </View>
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={<MyDoc />} fileName={`certificate-${verificationCode}.pdf`}>
      {({ loading }) => (
        <button className="btn-3d">{loading ? 'Generating...' : 'Download Certificate'}</button>
      )}
    </PDFDownloadLink>
  )
}
