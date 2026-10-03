export function buildEnquiryMailto({name,email,company,interest,message}) {
  const subject='NextGenius enquiry: '+interest;
  const body=['Name: '+name,'Email: '+email,'Company / project: '+(company||'Not provided'),'Interest: '+interest,'','Message:',message].join('\n');
  return 'mailto:info@nextgenius.com.au?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
