import ExpressAdapter from "../adapters/expressAdapter";
import AuthController from "../controllers/authController";
import BillModel from "../models/billModel";

const adapter = new ExpressAdapter();

const authRouter = () => {
    const router = adapter.createRouter();
    const authController = new AuthController();

    const prueba = async (_req: any, res: any) => {
        const bill = await BillModel.findBillByCode(1);

        console.log(bill)
        res.json({ bill })
    }

    adapter.setRouteRouter({
        method: 'post',
        route: '/prueba',
        router,
        callback: [prueba]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/login',
        router,
        callback: [authController.login]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/register',
        router,
        callback: [authController.register]
    });

    return router;
}

export default authRouter;