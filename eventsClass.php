<?php

require 'connect.php';

class Events
{
    private $db;

    /**
     * @param object $pdo
     */
    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * @return array events
     */
    public function getAll()
    {
        $stmt = $this->db->prepare('
            SELECT *
              FROM events
             WHERE live = 1
             ORDER BY start');
        $stmt->execute();
        $events = $stmt->fetchAll();

        $allEvents = [];

        foreach ($events as $event) {
            $json = [
                'id' => $event['id'],
                'title' => $event['title'],
                'description' => $event['description'],
                'start' => $this->setDateTime($event['start'], 'c'),
                'end' => $this->setDateTime($event['end'], 'c'),
                'url' => $event['url'],
                'allday' => true
            ];

            // Adds each array into the container array
            array_push($allEvents, $json);
        }

        return json_encode($allEvents);
    }

    /**
     * @param string $title
     * @param string $description
     * @param string $start
     * @param string $end
     * @param string $url
     */
    public function add($title, $description, $start, $end, $url)
    {
        $sql = '
            INSERT INTO events (title, description, start, end, url)
                 VALUES (:title, :description, :start, :end, :url)';
        $query = $this->db->prepare($sql);
        $query->execute(
            [
                'title' => $title,
                'description' => $description,
                'start' => $this->setDateTime($start, 'c'),
                'end' => $this->setDateTime($end, 'c'),
                'url' => $url
            ]
        );
    }

    /**
     * @param string $title
     * @param string $start
     * @param string $end
     * @param int $id
     */
    public function update($title, $start, $end, $id)
    {
        $sql = '
           UPDATE events
              SET title = :title, start = :start, end = :end
            WHERE id = :id';
        $query = $this->db->prepare($sql);
        $query->execute(
            [
               'title' => $title,
               'start' => $this->setDateTime($start),
               'end' => $this->setDateTime($end),
               'id' => $id
            ]
        );
    }

    /**
     * @param int $id
     */
    public function delete($id)
    {
        $sql = '
           UPDATE events
              SET live = 0
            WHERE id = :id';
        $query = $this->db->prepare($sql);
        $query->execute(['id' => $id]);
    }

    /**
     * @param string $date
     * @param optional string $format
     * @return string date formatted
     */
    private function setDateTime($date, $format = 'Y-m-d H:i:s')
    {
        $dt = new DateTime($date);
        $utc = new DateTimeZone("UTC");
        $dt->setTimezone($utc);

        return $dt->format($format);
    }
}
