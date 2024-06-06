import { rest } from 'msw'
import { createSurvey, getResults, getSurvey, getSurveys, postResult, removeSurvey, updateSurvey } from '../models/in-memory-storage'
import { apiBaseAddress } from '../models/survey'

export const handlers = [
    rest.get(apiBaseAddress + '/surveys', async (req, res, ctx) => {
        // const { userId } = req.params
        // return res(
        //   ctx.json({
        //     id: userId,
        //     firstName: 'John',
        //     lastName: 'Maverick',
        //   }),
        // )
        return res(
            ctx.json(await getSurveys()),
        )
    }),
    rest.get(apiBaseAddress + '/getActive', async (req, res, ctx) => {
        return res(
            ctx.json(await getSurveys()),
        )
    }),
    rest.get(apiBaseAddress + '/create', (req, res, ctx) => {
        return res(
            ctx.json(createSurvey()),
        )
    }),
    rest.get(apiBaseAddress + '/delete', async (req, res, ctx) => {
        const id = req.url.searchParams.get('id')
        await removeSurvey(id as string);
        return res(
            ctx.json({ id }),
        )
    }),
    rest.get(apiBaseAddress + '/getSurvey', async (req, res, ctx) => {
        const surveyId = req.url.searchParams.get('surveyId')
        return res(
            ctx.json(await getSurvey(surveyId as string)),
        )
    }),
    rest.post(apiBaseAddress + '/changeJson', async (req, res, ctx) => {
        const { id, json } = req.body as Record<string, any>
        await updateSurvey(id as string, json)
        return res(
            ctx.json({ id, json }),
        )
    }),
    rest.post(apiBaseAddress + '/post', async (req, res, ctx) => {
        const { postId, surveyResult } = req.body as Record<string, any>
        await postResult(postId as string, surveyResult)
        return res(
            ctx.json({}),
        )
    }),
    rest.get(apiBaseAddress + '/results', async (req, res, ctx) => {
        const postId = req.url.searchParams.get('postId')
        return res(
            ctx.json(await getResults(postId as string)),
        )
    })
]