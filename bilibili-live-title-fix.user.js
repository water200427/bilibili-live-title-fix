// ==UserScript==
// @name         Bilibili Live Title Fix
// @namespace    https://github.com/water200427
// @version      1.0.0
// @description  Restore missing Bilibili live title
// @match        https://live.bilibili.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getTitle() {
        return window.__NEPTUNE_IS_MY_WAIFU__
            ?.roomInfoRes?.data?.room_info?.title;
    }

    function inject() {
        const title = getTitle();
        const container = document.querySelector(".right-section");

        if (!title || !container) return;

        if (document.querySelector("#custom-bili-title")) return;

        const el = document.createElement("div");
        el.id = "custom-bili-title";
        el.textContent = title;

        el.style.cssText = `
            display: block;
            width: 100%;
            align-self: flex-start;

            font-size: 22px;
            font-weight: 800;
            color: #000;

            text-align: left;
            line-height: 1.3;

            margin: 8px 0 10px 12px;
            padding-left: 12px;
        `;

        container.prepend(el);
    }

    inject();

    const obs = new MutationObserver(inject);
    obs.observe(document.body, {
        childList: true,
        subtree: true
    });

})();