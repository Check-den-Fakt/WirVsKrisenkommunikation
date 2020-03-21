import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import Result from '../Result/Result';
import fetchAPI from '../../utils/fetchAPI';
import apisdk from '../../constants/apisdk';

export default function Check() {
  const [checkResult, setCheckResult] = useState(null);

  const handleSendData = async (data) => {
    const response = await fetchAPI.getData(apisdk.VALIDATE, data);
    setCheckResult(response);
  } 

  // Declare a new state variable, which we'll call "count"
  return (
    <>
      {checkResult ? <Result result={checkResult} /> : <div>
          {/* <h1></h1>
          <div className="container">
              <div className="raw">
                <div className="text-center">
                  <Diagram />
                </div>
              </div>
          </div> */}
        <h1 className="display-4">Check deine Corona-News</h1>
        <p className="lead">Bevor du Nachrichten glaubst oder weiterleitest, überprüfe erst ob sie wahr sind!</p>
        <AddNews onSubmit={handleSendData} />
      </div>}
    </>
  );
}