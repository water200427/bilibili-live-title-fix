// ==UserScript==
// @name         Bilibili Live Title Fix
// @name:zh-TW   Bilibili 直播標題修復
// @name:zh-CN   Bilibili 直播标题修复
// @namespace    https://github.com/water200427
// @version      1.0.1
// @author       water
// @description  Restore missing Bilibili live title
// @description:zh-TW  修復 Bilibili 直播間標題未顯示問題
// @description:zh-CN  修复 Bilibili 直播间标题未显示问题
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

            user-select: text;
            -webkit-user-select: text;
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