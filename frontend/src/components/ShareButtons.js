import React, { useState } from 'react';
import { Button, Popover } from 'react-bootstrap';
import { Overlay } from 'react-bootstrap';
import { TwitterIcon, TwitterShareButton, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';


export default function ShareButtons() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
      <div className="text-center">
        <Button onClick={() => setIsShareOpen(true)}>Share result!</Button>
        <Overlay
          show={isShareOpen}
          // trigger="click"
          placement="bottom"
          rootClose
          onHide={() => {
            setIsShareOpen(false)
          }}
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
  );
}