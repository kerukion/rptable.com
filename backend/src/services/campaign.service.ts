import { inject, injectable } from 'inversify';
import { IAuthService, ICampaignService, IDbService } from '~backend/interfaces';
import { TOKENS } from '~backend/tokens';
import { core } from '~core';
import { db } from '~db';

@injectable()
export class CampaignService implements ICampaignService {
    constructor(
        @inject(TOKENS.DbService) private dbService: IDbService,
        @inject(TOKENS.AuthService) private loginService: IAuthService
    ) { }

    async newCampaign(req: core.Request<core.NewCampaignRequest>): Promise<db.campaign.Schema> {
        const currentUser = await this.loginService.currentUser(req);

        const Campaigns = await this.dbService.Campaigns();

        const campaign = await Campaigns.create({
            user_createdby: currentUser!._id,
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        } as db.campaign.Schema);

        return CampaignService.campaignDocumentToSchema(campaign);
    }

    async getAll(id: db.user.Schema['_id']): Promise<db.campaign.Schema[] | undefined> {
        const Campaign = await this.dbService.Campaigns();
        const campaigns = await Campaign.find({user_createdby: id} as db.campaign.Schema);
        return campaigns.map(CampaignService.campaignDocumentToSchema);
    }
    
    async get(id: db.campaign.Schema['_id']): Promise<db.campaign.Schema | undefined> {
        const Campaign = await this.dbService.Campaigns();
        const campaign = await Campaign.findOne({_id: id} as db.campaign.Schema) || undefined;
        return campaign && CampaignService.campaignDocumentToSchema(campaign);
    }

    static campaignDocumentToSchema(document: db.campaign.Document): db.campaign.Schema {
        return {
            _id: document._id,
            name: document.name,
            description: document.description,
            imageUrl: document.imageUrl,
            user_createdby: document.user_createdby,
        };
    }
}
