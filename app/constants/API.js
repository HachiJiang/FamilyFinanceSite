'use strict';

/**
 * Enum for API URLs
 */

import _ from 'lodash';
const VERSION = 'v1';
const HOST = `http://localhost:8000/${VERSION}`;

/**
 * Accounts
 */
export const ACCOUNT_GET = `${HOST}/accounts`;
export const ACCOUNT_CREATE_CATEGORY = ACCOUNT_GET;
export const ACCOUNT_CREATE_SUBCATEGORY = _.template(`${HOST}/accounts/<%= catId %>/items`);
export const ACCOUNT_UPDATE_CATEGORY = _.template(`${HOST}/accounts/<%= catId %>`);
export const ACCOUNT_UPDATE_SUBCATEGORY = _.template(`${HOST}/accounts/<%= catId %>/items/<%= itemId %>`);
export const ACCOUNT_DELETE_CATEGORY = ACCOUNT_UPDATE_CATEGORY;
export const ACCOUNT_DELETE_SUBCATEGORY = ACCOUNT_UPDATE_SUBCATEGORY;

/**
 * Income
 */
export const INCOME_GET = `${HOST}/income`;
export const INCOME_CREATE_CATEGORY = INCOME_GET;
export const INCOME_CREATE_SUBCATEGORY = _.template(`${HOST}/income/<%= catId %>/items`);

/**
 * Outcome
 */
export const OUTCOME_GET = `${HOST}/outcome`;
export const OUTCOME_CREATE_CATEGORY = OUTCOME_GET;
export const OUTCOME_CREATE_SUBCATEGORY = _.template(`${HOST}/outcome/<%= catId %>/items`);

/**
 * Projects
 */
export const PROJECT_GET = `${HOST}/projects`;
export const PROJECT_CREATE_CATEGORY = PROJECT_GET;
export const PROJECT_CREATE_SUBCATEGORY = _.template(`${HOST}/projects/<%= catId %>/items`);

/**
 * Members
 */
export const MEMBER_GET = `${HOST}/members`;
export const MEMBER_CREATE = MEMBER_GET;

/**
 * Debtors
 */
export const DEBTOR_GET = `${HOST}/debtors`;
export const DEBTOR_CREATE = DEBTOR_GET;

/**
 * Records
 */
export const RECORD_GET = `${HOST}/records`;
export const RECORD_CREATE = RECORD_GET;
export const RECORD_UPDATE = _.template(`${HOST}/records/<%= rid %>`);
export const RECORD_DELETE = RECORD_UPDATE;