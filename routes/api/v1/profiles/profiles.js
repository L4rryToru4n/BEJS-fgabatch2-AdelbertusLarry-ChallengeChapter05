var express = require('express');
var router = express.Router();
const profile = require('../../../../controllers/profiles.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Profiles:
 *       type: object
 *       required:
 *         - user_id
 *         - identity_type
 *         - identity_number
 *         - address
 *       properties:
 *         id:
 *           type: Big int
 *           description: The auto-generated id of the profile
 *         user_id:
 *           type: Big int
 *           description: The profile's related user id
 *         identity_type:
 *           type: string
 *           description: The type of the user's profile
 *         identity_number:
 *           type: string
 *           description: The identity number of the user's profile
 *         address:
 *           type: string
 *           description: The address of user's profile
 *         isDeleted:
 *           type: boolean
 *           description: Whether the profile has been deleted
 *       example:
 *         user_id: 1
 *         identity_type: standard
 *         identity_number: 1d10d2b7-99f5-4187-a073-f8e653932513
 *         address: Example 01 St. No. 02
 *     GetProfilesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The array of profiles objects
 *       example:
 *         status: true
 *         data: [
 *            {
 *               id: 1n,
 *               user_id: 1n,
 *               identity_type: standard,
 *               identity_number: bf30200f-647c-40dc-b0f1-885518ff07d8,
 *               address: Example 01 St. No. 02
 *            },
 *            {
 *               id: 2n,
 *               user_id: 2n,
 *               identity_type: standard,
 *               identity_number: 127a60d5-a65b-435b-848a-39824eb11e68,
 *               address: Example 02 St. No. 03
 *            },
 *            {
 *               id: 3n,
 *               user_id: 3n,
 *               identity_type: administrator,
 *               identity_number: 842fa793-a627-40c8-ac05-37db7dc79064,
 *               address: Example 03 St. No. 04
 *            }
 *         ]
 *     GetProfilesErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: No profiles have been found
 *     GetProfileResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the profile object
 *       example:
 *         status: true
 *         data: {
 *                id: 1n,
 *                user_id: 1n,
 *                identity_type: administrator,
 *                identity_number: 1d10d2b7-99f5-4187-a073-f8e653932513,
 *                address: Example 01 St. No. 02
 *         }
 *     GetProfileErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: No profile have been found
 *     CreateProfileResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the profile object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             identity_type: administrator,
 *             identity_number: 1d10d2b7-99f5-4187-a073-f8e653932513,
 *             address: Example 01 St. No. 02,
 *             isDeleted: false
 *         }
 *     CreateProfileErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: Create profile failed. Please complete your data request.
 *     UpdateProfileResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the profile object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             identity_type: standard,
 *             identity_number: 1d10d2b7-99f5-4187-a073-f8e653932513,
 *             address: Example 02 St. No. 03,
 *             isDeleted: false
 *         }
 *     UpdateProfileErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: Update profile failed. Please complete your data request.
 *     DeleteProfileResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the profile object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             identity_type: standard,
 *             identity_number: 1d10d2b7-99f5-4187-a073-f8e653932513,
 *             address: Example 02 St. No. 03,
 *             isDeleted: true
 *         }
 *     DeleteProfileErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: Delete profile failed. Please complete your data request
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: The management of profiles API
 * /profiles:
 *   get:
 *     summary: Lists all of the profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: The list of the profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetProfilesResponse'
 *       404:
 *         description: The profiles were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfilesErrResponse'
 * /profiles/create:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profiles'
 *     responses:
 *       200:
 *         description: The created profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProfileResponse'
 *       400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProfileErrResponse'
 * /profiles/{id}:
 *   get:
 *     summary: Get the profile by id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfileResponse'
 *       404:
 *         description: The profile was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfileErrResponse'
 * /profiles/update/{id}:
 *   put:
 *    summary: Update the profile by the id
 *    tags: [Profiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profiles'
 *    responses:
 *      200:
 *         description: The profile was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProfileResponse'
 *      400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProfileErrResponse'
 * /profiles/delete/{id}:
 *   delete:
 *     summary: Remove the profile by id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteProfileResponse'
 *       400:
 *         description: The profile was not found
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteProfileErrResponse'
 */

/* CRUD profiles */
router.get('/', profile.getProfiles);
router.get('/:id', profile.getProfiles);
router.post('/create', profile.createProfile);
router.put('/update/:id', profile.updateProfile);
router.delete('/delete/:id', profile.deleteProfile);

module.exports = router;
