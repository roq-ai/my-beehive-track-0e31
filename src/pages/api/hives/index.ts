import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { hiveValidationSchema } from 'validationSchema/hives';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getHives();
    case 'POST':
      return createHive();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHives() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.hive
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'hive'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createHive() {
    await hiveValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.bee?.length > 0) {
      const create_bee = body.bee;
      body.bee = {
        create: create_bee,
      };
    } else {
      delete body.bee;
    }
    if (body?.harvest?.length > 0) {
      const create_harvest = body.harvest;
      body.harvest = {
        create: create_harvest,
      };
    } else {
      delete body.harvest;
    }
    if (body?.health_check?.length > 0) {
      const create_health_check = body.health_check;
      body.health_check = {
        create: create_health_check,
      };
    } else {
      delete body.health_check;
    }
    const data = await prisma.hive.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
