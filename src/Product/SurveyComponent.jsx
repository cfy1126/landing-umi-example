import React from "react";

import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

import alasql from "alasql";

import "survey-core/defaultV2.css";
import { json } from "./json";

StylesManager.applyTheme("defaultV2");

function loadContinents(survey, destinationQuestionName) {
    alasql
        .promise(
            "SELECT DISTINCT [Continent] AS [value], [Continent] AS [text] FROM csv('./countries') ORDER BY [Continent]"
        )
        .then(function (results) {
            var q = survey.getQuestionByName(destinationQuestionName);
            q.choices = results;
        })
        .catch(console.error);
}

function loadCountries(survey, destinationQuestionName, continent) {
    alasql
        .promise(
            "SELECT DISTINCT [Code] AS [value], [Name] AS [text] FROM csv('./countries') WHERE [Continent] = ? ORDER BY [Name]",
            [continent]
        )
        .then(function (results) {
            var q = survey.getQuestionByName(destinationQuestionName);
            q.choices = results;
        })
        .catch(console.error);
}

function onAfterRenderQuestion(sender, options) {
    if (options.question.name === "continent") {
        loadContinents(sender, options.question.name);
    }
}

function onValueChanged(sender, options) {
    if (options.question.name === "continent") {
        loadCountries(sender, "country", options.value);
    }
}

function SurveyComponent() {
    const survey = new Model(json);

    survey.onAfterRenderQuestion.add(onAfterRenderQuestion);
    survey.onValueChanged.add(onValueChanged);

    return <Survey model={survey} />;
}

export default SurveyComponent;
