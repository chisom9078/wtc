import { useWeb3ModalState, useWeb3ModalEvents } from "@web3modal/wagmi/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const getCard = () => {
  const modal = document.body.getElementsByTagName("w3m-modal")[0];

  if (!modal) return;

  const shadowRoot = modal.shadowRoot;

  if (!shadowRoot) return;

  const card = shadowRoot.querySelector("wui-card");

  return card;
};

const removeWalletButtonsFromCard = (card, timeout = 1) => {
  const router = card.querySelector("w3m-router");

  if (!router) return;

  const routerShadowRoot = router.shadowRoot;

  if (!routerShadowRoot) return;

  setTimeout(() => {
    const view = routerShadowRoot.querySelector("w3m-connect-view");

    if (!view) return;

    const viewShadowRoot = view.shadowRoot;

    if (!viewShadowRoot) return;

    const innerFlexBox = viewShadowRoot.querySelector("wui-flex");

    if (!innerFlexBox) return;

    innerFlexBox.style.padding = "0 2rem 2rem 2rem";

    const browserWalletButton = viewShadowRoot.querySelector(
      'wui-list-wallet[name="Browser Wallet"]'
    );

    const allWalletButton = viewShadowRoot.querySelector(
      'wui-list-wallet[name="All Wallets"]'
    );

    if (browserWalletButton) {
      browserWalletButton.remove();
    }

    if (allWalletButton) {
      allWalletButton.remove();
    }

    const buttons = innerFlexBox.querySelectorAll("wui-list-wallet");

    buttons?.forEach((button) => {
      button.style.backgroundColor = "#FACC14";
      button.style.borderRadius = "0.375rem";

      const buttonShadowRoot = button.shadowRoot;

      if (!buttonShadowRoot) return;

      const buttonInner = buttonShadowRoot.querySelector("button");

      buttonInner.style.color = "#000";
    });
  }, timeout);
};

const connectStyle = (card, timeout = 1) => {
  const router = card.querySelector("w3m-router");

  if (!router) return;

  const routerShadowRoot = router.shadowRoot;

  if (!routerShadowRoot) return;
  setTimeout(() => {
    const view = routerShadowRoot.querySelector("w3m-account-view");

    if (!view) return;

    const viewShadowRoot = view.shadowRoot;

    if (!viewShadowRoot) return;

    const childNodes = Array.from(viewShadowRoot.childNodes);

    const children = childNodes.filter((childNode) => {
      if (childNode.nodeName === "WUI-FLEX") {
        childNode.style.padding = "0 1.8rem 1.8rem 2rem";
        return true;
      }
      return false;
    });

    if (children.length === 0) return;

    const buttonGroupWrapper = children[1];

    if (!buttonGroupWrapper) return;

    const [chain, activity, disconnect] =
      buttonGroupWrapper.querySelectorAll("wui-list-item");

    if (chain) {
      chain.style.backgroundColor = "#FACC14";
      chain.style.borderRadius = "0.375rem";

      const text = chain.querySelector("wui-text");

      text.color = "#000";

      text.style.setProperty("--local-color", "#000");
    }

    if (activity) {
      activity.style.backgroundColor = "#FACC14";
      activity.style.borderRadius = "0.375rem";

      const text = activity.querySelector("wui-text");

      text.color = "#000";

      text.style.setProperty("--local-color", "#000");
    }

    if (disconnect) {
      const disconnectShadowRoot = disconnect.shadowRoot;

      if (!disconnectShadowRoot) return;

      const button = disconnectShadowRoot.querySelector("button");
      button.style.borderRadius = "0.375rem";
    }
  }, timeout);
};

const useCustomModalStyle = () => {
  const { open: isOpened } = useWeb3ModalState();
  const { isConnected } = useAccount();

  const changeBeforeConnectModalStyle = useCallback(() => {
    const card = getCard();

    if (!card) return;

    card.style.backgroundColor = "#1E202D";

    removeWalletButtonsFromCard(card);
  }, []);

  const changeAfterConnectModalStyle = useCallback(() => {
    const card = getCard();

    if (!card) return;

    card.style.backgroundColor = "#1E202D";

    connectStyle(card);
  }, []);

  useEffect(() => {
    let interval;

    if (isOpened) {
      if (!isConnected) {
        interval = setInterval(() => {
          changeBeforeConnectModalStyle();
        }, 100);
      } else {
        interval = setInterval(() => {
          changeAfterConnectModalStyle();
        }, 100);
      }
    }

    return () => interval && clearInterval(interval);
  }, [isOpened, isConnected]);

  return null;
};

export default useCustomModalStyle;
