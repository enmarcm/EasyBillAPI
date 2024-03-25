import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";
import authRouter from "./authRouter";

const adapter = new ExpressAdapter();

const indexRouter = () => {
    const iRouter = adapter.createRouter();

    adapter.middlewarePersonalized({
        router: iRouter,
        middleware: (_req: Request, _res: Response, next) => {
            next();
        }
    })

    adapter.setRouter({
        route: '/auth',
        router: iRouter,
        callbackRouter: authRouter()
    });

    return iRouter;
}

export default indexRouter;