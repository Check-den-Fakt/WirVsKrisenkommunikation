import React, { useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { TwitterIcon, TwitterShareButton, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import './ShareButtons.css'

const popover = (
    <Popover id="popover-basic">
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
);

export default function ShareButtons() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
      <div className="share-buttons-item text-right">
          <OverlayTrigger trigger="click" placement="bottmm" overlay={popover}>
            <div className="trigger-container">
              <a className="fact-link" onClick={() => setIsShareOpen(true)}>Teile das Ergebnis</a>
              <span className="fact-link material-icons share-icon">share</span>
            </div>
        </OverlayTrigger>
      </div>
  );
}