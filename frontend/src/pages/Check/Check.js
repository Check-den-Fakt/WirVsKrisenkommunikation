import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import Result from '../Result/Result';
import fetchAPI from '../../utils/fetchAPI';
import apisdk from '../../constants/apisdk';

export default function Check() {
  const [checkResult, setCheckResult] = useState(null);
  const [requestData, setRequestData] = useState(null);

  const handleSendData = async (data) => {
    console.log(data);
    setRequestData(data);
    const response = await fetchAPI.postData(apisdk.VALIDATE, {
      url: '',
      text: '',
      ...data
    });
    console.log(response);
    setCheckResult(response);
  } 

  // Declare a new state variable, which we'll call "count"
  return (
    <>
      {checkResult ? <Result requestData={requestData} result={checkResult} /> : <div>
        <h1 className="display-4">Check deine Corona-News</h1>
        <p className="lead">Du bist Dir nicht sicher, ob eine Nachricht wahr ist? Wir helfen Dir!</p>
        <AddNews onSubmit={handleSendData} />
      </div>}
    </>
  );
}