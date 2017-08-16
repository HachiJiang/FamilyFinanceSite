'use strict';

/**
 * Enum for API URLs
 */

import _ from 'lodash';
const VERSION = 'v1';
const HOST = `http://localhost:8000/api/${VERSION}`;

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
export const INCOME_UPDATE_CATEGORY = _.template(`${HOST}/income/<%= catId %>`);
export const INCOME_UPDATE_SUBCATEGORY = _.template(`${HOST}/income/<%= catId %>/items/<%= itemId %>`);
export const INCOME_DELETE_CATEGORY = INCOME_UPDATE_CATEGORY;
export const INCOME_DELETE_SUBCATEGORY = INCOME_UPDATE_SUBCATEGORY;

/**
 * Outcome
 */
export const OUTCOME_GET = `${HOST}/outcome`;
export const OUTCOME_CREATE_CATEGORY = OUTCOME_GET;
export const OUTCOME_CREATE_SUBCATEGORY = _.template(`${HOST}/outcome/<%= catId %>/items`);
export const OUTCOME_UPDATE_CATEGORY = _.template(`${HOST}/outcome/<%= catId %>`);
export const OUTCOME_UPDATE_SUBCATEGORY = _.template(`${HOST}/outcome/<%= catId %>/items/<%= itemId %>`);
export const OUTCOME_DELETE_CATEGORY = OUTCOME_UPDATE_CATEGORY;
export const OUTCOME_DELETE_SUBCATEGORY = OUTCOME_UPDATE_SUBCATEGORY;

/**
 * Projects
 */
export const PROJECT_GET = `${HOST}/projects`;
export const PROJECT_CREATE_CATEGORY = PROJECT_GET;
export const PROJECT_CREATE_SUBCATEGORY = _.template(`${HOST}/projects/<%= catId %>/items`);
export const PROJECT_UPDATE_CATEGORY = _.template(`${HOST}/projects/<%= catId %>`);
export const PROJECT_UPDATE_SUBCATEGORY = _.template(`${HOST}/projects/<%= catId %>/items/<%= itemId %>`);
export const PROJECT_DELETE_CATEGORY = PROJECT_UPDATE_CATEGORY;
export const PROJECT_DELETE_SUBCATEGORY = PROJECT_UPDATE_SUBCATEGORY;

/**
 * Members
 */
export const MEMBER_GET = `${HOST}/members`;
export const MEMBER_CREATE = MEMBER_GET;
export const MEMBER_UPDATE = _.template(`${HOST}/members/<%= memberId %>`);
export const MEMBER_DELETE = MEMBER_UPDATE;

/**
 * Debtors
 */
export const DEBTOR_GET = `${HOST}/debtors`;
export const DEBTOR_CREATE = DEBTOR_GET;
export const DEBTOR_UPDATE = _.template(`${HOST}/debtors/<%= debtorId %>`);
export const DEBTOR_DELETE = DEBTOR_UPDATE;

/**
 * Records
 */
export const RECORD_GET = `${HOST}/records`;
export const RECORD_GET_BY_DATE = _.template(`${HOST}/records/from/<%= fDate %>/to/<%= tDate %>`);
export const RECORD_CREATE = RECORD_GET;
export const RECORD_UPDATE = _.template(`${HOST}/records/<%= rid %>`);
export const RECORD_DELETE = RECORD_UPDATE;

/**
 * Outcome
 */
// get outcome by date, response organized by day
export const OUTCOME_GET_BY_DATE = _.template(`${HOST}/amount/aggregate_by_day/outcome/from/<%= fDate %>/to/<%= tDate %>`);
// get outcome by date, response organized by day
export const OUTCOME_GET_BY_CATEGORY = _.template(`${HOST}/amount/aggregate_by_category/outcome/from/<%= fDate %>/to/<%= tDate %>`);