import { Request, Response } from 'express';
import { Club } from '../models/clubModel';

export const getClubInfo = async (req: Request, res: Response) => {
    try {
        const club = await Club.findOne();
        if (club) {
            res.json(club);
        } else {
            res.status(404).json({ message: 'Club information not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching club information' });
    }
};

export const updateClubInfo = async (req: Request, res: Response) => {
    try {
        const [updatedRowsCount, [updatedClub]] = await Club.update(req.body, {
            where: {},
            returning: true,
        });

        if (updatedRowsCount > 0) {
            res.json(updatedClub);
        } else {
            res.status(404).json({ message: 'Club information not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating club information' });
    }
};