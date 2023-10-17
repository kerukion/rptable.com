import express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, interfaces, request, requestParam, response, } from 'inversify-express-utils';
import { ICampaignService } from '~backend/interfaces';
import { routes } from '~backend/routes';
import { TOKENS } from '~backend/tokens';
import { core } from '~core';
import { db } from '~db';

@controller('')
export class CampaignController implements interfaces.Controller {

    constructor(@inject(TOKENS.CampaignService) private campaignService: ICampaignService) { }

    @httpPost(routes['/campaigns'])
    public async newCampaign(req: core.Request<core.NewCampaignRequest>, res: express.Response): Promise<db.campaign.Schema | undefined> {
        const campaign = await this.campaignService.newCampaign(req);
        res.status(201);
        return campaign;
    }

    @httpGet(routes['/users/:id/campaigns'](':id'))
    public async getAll(@requestParam('id') id: db.user.Schema['_id'], @request() _: core.Request, @response() res: express.Response): Promise<db.campaign.Schema[] | undefined> {
        const campaigns = await this.campaignService.getAll(id);
        res.status(200);
        return campaigns;
    }
    
    @httpGet(routes['/campaigns/:id'](':id'))
    public async get(@requestParam('id') id: db.user.Schema['_id'], @request() _: core.Request, @response() res: express.Response): Promise<db.campaign.Schema | undefined> {
        const campaign = await this.campaignService.get(id);
        res.status(200);
        return campaign;
    }
}
