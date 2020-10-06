import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category, { ICategory } from '../entity/Category';
import StatusCodes from 'http-status-codes';
import Product, { IProduct } from '../entity/Product';

export const getCategoryList = async (
  req: Request<{}, Array<ICategory & { id: number }>>,
  res: Response<Array<ICategory & { id: number }>>
) => {
  const categoryRepository = getRepository(Category);
  const categories = await categoryRepository.find();
  return res.status(StatusCodes.OK).json(categories);
};

interface CategoryRequestParams {
  id: string;
}

export const getCategory = async (
  req: Request<CategoryRequestParams, ICategory & { id: number }>,
  res: Response<ICategory & { id: number }>
) => {
  try {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOneOrFail(
      parseInt(req.params.id)
    );
    return res.status(StatusCodes.OK).json(category);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const createCategory = async (
  req: Request<{}, {}, ICategory>,
  res: Response
) => {
  try {
    const categoryRepository = getRepository(Category);
    const insertResult = await categoryRepository.insert(req.body);
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/categories/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const updateCategory = async (
  req: Request<CategoryRequestParams, {}, Partial<ICategory>>,
  res: Response
) => {
  try {
    const categoryRepository = getRepository(Category);
    const categoryId = parseInt(req.params.id);
    await categoryRepository.findOneOrFail(categoryId);
    await categoryRepository.update(categoryId, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const deleteCategory = async (
  req: Request<CategoryRequestParams>,
  res: Response
) => {
  try {
    const categoryRepository = getRepository(Category);
    const categoryId = parseInt(req.params.id);
    await categoryRepository.findOneOrFail(categoryId);
    await categoryRepository.delete(categoryId);
    return res.status(StatusCodes.OK).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const getCategoryProducts = async (
  req: Request<CategoryRequestParams, Array<IProduct & { id: number }>>,
  res: Response<Array<IProduct & { id: number }>>
) => {
  try {
    const categoryRepository = getRepository(Category);
    const productRepository = getRepository(Product);
    const categoryId = parseInt(req.params.id);
    await categoryRepository.findOneOrFail(categoryId);
    const products = await productRepository.find({ categoryId });
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
