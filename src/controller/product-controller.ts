import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product, { IProduct } from '../entity/Product';
import StatusCodes from 'http-status-codes';

import AuthorizedRequest from '../auth/authorized-request';
import Category from '../entity/Category';
import Review, { IReview } from '../entity/Review';
import { UserRoles } from '../entity/User';

export const getProductsList = async (
  req: AuthorizedRequest<{}, Array<IProduct & { id: number }>>,
  res: Response<Array<IProduct & { id: number }>>
) => {
  const productRepository = getRepository(Product);
  const products = await productRepository.find();
  return res.status(StatusCodes.OK).json(products);
};

interface ProductRequestParams {
  id: string;
}

export const getProduct = async (
  req: Request<ProductRequestParams, IProduct & { id: number }>,
  res: Response<IProduct & { id: number }>
) => {
  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOneOrFail(
      parseInt(req.params.id)
    );
    return res.status(StatusCodes.OK).json(product);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const createProduct = async (
  req: AuthorizedRequest<ProductRequestParams, {}, IProduct>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);
    const categoryId = parseInt(req.params.id);
    await categoryRepository.findOneOrFail(categoryId);
    const insertResult = await productRepository.insert({
      ...req.body,
      categoryId
    });
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/products/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const updateProduct = async (
  req: AuthorizedRequest<ProductRequestParams, {}, Partial<IProduct>>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);
    const productId = parseInt(req.params.id);
    await productRepository.findOneOrFail(productId);
    if (req.body.categoryId) {
      await categoryRepository.findOneOrFail(req.body.categoryId);
    }
    await productRepository.update(productId, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const deleteProduct = async (
  req: AuthorizedRequest<ProductRequestParams>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const productRepository = getRepository(Product);
    const productId = parseInt(req.params.id);
    await productRepository.findOneOrFail(productId);
    await productRepository.delete(productId);
    return res.status(StatusCodes.OK).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const getProductReviews = async (
  req: Request<ProductRequestParams, Array<IReview & { id: number }>>,
  res: Response<Array<IReview & { id: number }>>
) => {
  try {
    const reviewRepository = getRepository(Review);
    const productRepository = getRepository(Product);
    const productId = parseInt(req.params.id);
    await productRepository.findOneOrFail(productId);
    const reviews = await reviewRepository.find({ productId });
    return res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error.message);
  }
};

export const createProductReview = async (
  req: AuthorizedRequest<ProductRequestParams, {}, IReview>,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
    const reviewRepository = getRepository(Review);
    const productRepository = getRepository(Product);
    const productId = parseInt(req.params.id);
    await productRepository.findOneOrFail(productId);
    const insertResult = await reviewRepository.insert({
      ...req.body,
      productId,
      userId: req.user.id
    });
    return res
      .status(StatusCodes.CREATED)
      .header(
        'Location',
        `/products/${req.params.id}/reviews/${insertResult.raw.insertId}`
      )
      .send();
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

export const getProductReview = async (
  req: Request<
    ProductRequestParams & { reviewId: string },
    IReview & { id: number }
  >,
  res: Response<IReview & { id: number }>
) => {
  try {
    const reviewRepository = getRepository(Review);
    const productRepository = getRepository(Product);
    const productId = parseInt(req.params.id);
    const reviewId = parseInt(req.params.reviewId);
    await productRepository.findOneOrFail(productId);
    const review = await reviewRepository.findOneOrFail(reviewId);
    return res.status(StatusCodes.OK).json(review);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};
