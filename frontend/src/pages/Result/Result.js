import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar, Overlay, Popover, OverlayTrigger } from 'react-bootstrap';
import { TwitterIcon, TwitterShareButton, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { Button } from 'react-bootstrap';

export default function Result({ result }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <h1 className="display-4">Check deine Corona-News</h1>
      <p className="lead">Bevor du Nachrichten glaubst oder weiterleitest, überprüfe erst ob sie wahr sind!</p>
      <ProgressBar now={60} />
      {JSON.stringify(result, null, 2)}
      <div className="text-center">
        <Button onClick={() => setIsShareOpen(true)}>Share result!</Button>
        <Overlay
          show={isShareOpen}
          trigger="click"
          placement="bottom"
          onHide={() => setIsShareOpen(false)}
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3">Share</Popover.Title>
            <Popover.Content>
              <TwitterShareButton
                url="www.check-the-fact.com"
                title="result"
                className="Demo__some-network__share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
              <FacebookShareButton
                url="www.check-the-fact.com"
                title="result"
                className="Demo__some-network__share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
              <TelegramShareButton
                url="www.check-the-fact.com"
                title="result"
                className="Demo__some-network__share-button">
                <TelegramIcon
                  size={32}
                  round />
              </TelegramShareButton>
              <WhatsappShareButton
                url="www.check-the-fact.com"
                title="result"
                className="Demo__some-network__share-button">
                <WhatsappIcon
                  size={32}
                  round />
              </WhatsappShareButton>
              <LinkedinShareButton
                url="www.check-the-fact.com"
                title="result"
                className="Demo__some-network__share-button">
                <LinkedinIcon
                  size={32}
                  round />
              </LinkedinShareButton>
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>
    </div>
  );
}