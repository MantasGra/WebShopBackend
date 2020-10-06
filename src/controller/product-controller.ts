import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product, { IProduct } from '../entity/Product';
import StatusCodes from 'http-status-codes';
import Category from '../entity/Category';

export const getProductsList = async (
  req: Request<{}, Array<IProduct & { id: number }>>,
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
  req: Request<{}, {}, IProduct>,
  res: Response
) => {
  try {
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);
    await categoryRepository.findOneOrFail(req.body.categoryId);
    const insertResult = await productRepository.insert(req.body);
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/products/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const updateProduct = async (
  req: Request<ProductRequestParams, {}, Partial<IProduct>>,
  res: Response
) => {
  try {
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
  req: Request<ProductRequestParams>,
  res: Response
) => {
  try {
    const productRepository = getRepository(Product);
    const productId = parseInt(req.params.id);
    await productRepository.findOneOrFail(productId);
    await productRepository.delete(productId);
    return res.status(StatusCodes.OK).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
