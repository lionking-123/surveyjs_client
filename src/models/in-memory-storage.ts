import axios from 'axios';
import { defaultJSON, ISurveyDefinition, survey1Json, survey1Results, survey2Json, survey2Results } from "./survey";

const surveys: Array<ISurveyDefinition> = [ survey1Json, survey2Json ];

const results: { [index: string]: Array<any> } = {
    '1': survey1Results,
    '2': survey2Results
};

const url = "https://us-central1-dev-tests-425508.cloudfunctions.net/api";

export async function getSurveys() {
    const response = await axios.get(url + '/getActive');
    const surveys = response.data;
    return surveys;
}

export async function createSurvey() {
    const response = await axios.post(url + '/create');
    const newSurvey = response.data;
    return newSurvey;
}

export async function getSurvey(id: string) {
    const response = await axios.get(url + '/getSurvey?surveyId=' + id);
    const survey = response.data;
    return survey;
}

export async function removeSurvey(id: string) {
    await axios.get(url + '/delete?id=' + id);
}

export async function updateSurvey(id: string, json: any) {
    const postData = {
        id: id,
        json: json
    };

    await axios.post(url + '/changeJson', postData);
}

export async function postResult(id: string, json: any) {
    const postData = {
        postId: id,
        surveyResult: json
    };

    await axios.post(url + '/post', postData);
}

export async function getResults(id: string) {
    const response = await axios.get(url + '/results?postId=' + id);
    const results = response.data;
    return results;
}
