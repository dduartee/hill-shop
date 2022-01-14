// nextJS api route for best-hills
export type Hill = {
    id: number;
    name: string;
    location: string;
    height: number;
}
const bestHills = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      hills: [
        {
          id: 1,
          name: 'Mount Everest',
          location: 'Nepal',
          height: 8848,
        },
        {
          id: 2,
          name: 'K2',
          location: 'Pakistan',
          height: 8611,
        },
        {
          id: 3,
          name: 'Lhotse',
          location: 'Nepal',
          height: 8848,
        },
        {
          id: 4,
          name: 'Makalu',
          location: 'Nepal',
          height: 8848,
        },
      ] as Hill[],
    },
  });
};

export default bestHills